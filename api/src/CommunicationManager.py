from utilities import Singleton

import requests

class CommunicationManager(metaclass=Singleton.Singleton):
    telegram_token_channel = "5704834893:AAE7zKrU7EnubWI1kb4aNa_9pPQerFdrjrM"

    def get_users(self):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/getUpdates"
        response = requests.get(url)
        users = set()
        data = response.json()["result"]
        for item in data:
            users.add(item["message"]["chat"]["id"])
        return users

    def send_broadcast_message(self, message):
        users = self.get_users()
        for user in users:
            url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendMessage?chat_id="+str(user)+"&text="+message
            data = requests.get(url)

    def send_message(self, user_id, message):
        import requests
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendMessage?chat_id="+str(user_id)+"&text="+message
        requests.get(url)

    def send_image(self, user_id, image_url):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendPhoto?chat_id="+str(user_id)+"&photo="+image_url
        requests.get(url)

    def send_video(self, user_id, video_url):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendVideo?chat_id="+str(user_id)+"&video="+video_url
        requests.get(url)

    def send_audio(self, user_id, audio_url):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendAudio?chat_id="+str(user_id)+"&audio="+audio_url
        requests.get(url)

    def send_document(self, user_id, document_url):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendDocument?chat_id="+str(user_id)+"&document="+document_url
        requests.get(url)

    def send_location(self, user_id, latitude, longitude):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendLocation?chat_id="+str(user_id)+"&latitude="+str(latitude)+"&longitude="+str(longitude)
        requests.get(url)

    def send_contact(self, user_id, phone_number, first_name, last_name):
        url = "https://api.telegram.org/bot"+self.telegram_token_channel+"/sendContact?chat_id="+str(user_id)+"&phone_number="+str(phone_number)+"&first_name="+str(first_name)+"&last_name="+str(last_name)
        requests.get(url)

    def send_broadcast_app_notifications_workers(self, msg, status=0):
        url_tokens = "https://mariorui-bc1e2-default-rtdb.europe-west1.firebasedatabase.app/tokens_workers.json"

        url_fcm = "https://fcm.googleapis.com/fcm/send"
        server_key = "AAAAZYP-M6w:APA91bF1tze3qVxc1DJ7e6mxUw0kGkod_P9uUkZZbX8fImHxLxN_xGWB6svL7yVZ2uC4WUagRMZ0L4c98cqdJU3P3y3fTGM4p9GPYG4pevzn26ZkuauwooJihP3gU2pKAP6BGQbFOLUM"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + server_key
        }

        response = requests.get(url_tokens)
        data_token = response.json()
        token_notified_list = []
        for id_token in data_token:
            token = data_token[id_token]

            if token not in token_notified_list: # Exclude duplicates
                token_notified_list.append(token)

                data = {
                    "to": token,
                    "notification": {
                        "title": "RUI Notification",
                        "body": msg
                    }
                }
                print(">>>>Sending notification to: " + str(token))
                response = requests.post(url_fcm, json=data, headers=headers)
                print("<<<<<",response.text,"\n")

        self.write_notification_history(msg,status)

    def write_notification_history(self, msg, status):
        import datetime
        import requests
        url = "https://mariorui-bc1e2-default-rtdb.europe-west1.firebasedatabase.app/notifications_history_workers.json"
        data = {
            "date": str(datetime.datetime.now()),
            "message": msg,
            "status": status
        }
        requests.post(url, json=data)

    def add_task(self, task: str, owner: str):
        import requests
        url = "https://mariorui-bc1e2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
        data = {
            "status": 0,
            "text": task,
            "owner": owner
        }
        requests.post(url, json=data)


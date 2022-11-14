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

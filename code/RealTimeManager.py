import requests

class RealTimeManager:
    base_url = "https://mariorui-bc1e2-default-rtdb.europe-west1.firebasedatabase.app/"

    def read_values(self):
        response = requests.get(self.base_url + ".json")
        data = response.json()
        return data

    def write_values(self,folder:str, data):
        response =  requests.post(self.base_url +"/"+folder+ ".json", json=data)
        return response.json()["name"] #returns the id of the child

if __name__ == '__main__':
    x = RealTimeManager()
    print("Data on firebase:\n",x.read_values())
    print()
    map = {"a": 1, "b": 2}
    print("Writing map ["+str(map)+"] to firebase:",x.write_values(folder="test",data=map))
    print()
    print("Data on firebase:\n",x.read_values())


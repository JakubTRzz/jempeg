import time
import random
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return "CAN Simulation Server Çalışıyor!"

def generate_can_message():
    ids = [0x100, 0x200, 0x300]
    while True:
        msg = {
            "id": hex(random.choice(ids)),
            "dlc": 8,
            "data": [random.randint(0, 255) for _ in range(8)]
        }
        socketio.emit("can_message", msg)
        time.sleep(1)

if __name__ == "__main__":
    socketio.start_background_task(generate_can_message)
    socketio.run(app, host="0.0.0.0", port=5000)

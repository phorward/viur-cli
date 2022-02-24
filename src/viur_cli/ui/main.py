from .manager.tasks import TaskManager
from .manager.io import SocketIoManager
from .manager.app import App
from .routes import routes
import os
import logging

def main():
	logging.getLogger().setLevel(logging.DEBUG)
	for route in routes:
		route.__path__ = os.path.dirname(__file__)
		App().register_blueprint(route)

	TaskManager().start()
	SocketIoManager().init_app(App().app)
	SocketIoManager().run(App().app, debug=False, host="127.0.0.1", port=63901)

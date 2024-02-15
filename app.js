var channel = null;

const handleActions = (action, data) => {
	config.handleActions(action, data);
};

const connectChannel = () => {
	channel = new BroadcastChannel(config.channel);
	channel.onmessage = (event) => {
		const message = JSON.parse(event.data);
		if (message.author !== config.author) {
			handleActions(message.action, message.data);
		}
	};
};

const sendData = (action, data=null) => {
	while (channel === null) {
		connectChannel();
	}
	channel.postMessage(JSON.stringify({
		author: config.author,
		action,
		data
	}));
};

const runApp = () => {
	connectChannel();
	sendData("status-connect", config.author);
};
<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <div>
          <h1 class="text-center m-b-lg">问答示例</h1>
        </div>
        <div class="answer">
          <div id="chatWindow" class="mb-3">
            <div class="row message-bubble"
                 :class="{'user-message': message.isUser, 'bot-message': !message.isUser}"
                 v-for="(message, index) in messages"
                 :key="index">
              <img class="chat-icon" :src="message.icon" alt="0">
              <p class="message-text">{{ message.text }}</p>
            </div>
          </div>
          <div class="input-group ipt">
            <div class="col-xs-12">
              <textarea v-model="messageInput" @keyup.enter="sendMessage" class="form-control" rows="1" placeholder="请输入你的问题..."></textarea>
            </div>
            <button @click="sendMessage" class="btn btn-primary" type="button">GO</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messageInput: '',
      messages: [],
      userIcon: require('@/icons/人.png'),
      botIcon: require('@/icons/回复.png')
    }
  },
  methods: {
    addUserMessage(message) {
      this.messages.push({
        icon: this.userIcon,
        text: message,
        isUser: true,
      });
    },
    addBotMessage(message) {
      this.messages.push({
        icon: this.botIcon,
        text: message,
        isUser: false,
      });
    },
    sendMessage() {
      if (this.messageInput.length === 0) {
        alert("请输入内容！");
        return;
      }
      const messageToSend = this.messageInput;
      this.addUserMessage(messageToSend);
      this.messageInput = '';

      //axios.post('localhost:8070/query?question', { prompt: JSON.stringify(this.messageInput) })
      axios.get('localhost:8070/query', { params: { question: JSON.stringify(messageToSend)} })
          .then(response => {
            this.addBotMessage(response.data.content);
          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
            this.addBotMessage('出错啦！请稍后再试!');
          });
    }
  }
}
</script>

<style>
body {
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

h1 {
  text-align: center;
  color: #696969;
  padding: 20px;
}

.answer {
  width: 70%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  overflow: hidden;
  padding: 20px;
}

#chatWindow {
  max-height: calc(70vh - 120px);
  height: auto;
  overflow-y: auto;
  padding: 0;
}

.message-bubble {
  padding: 10px;
  margin: 15px 0;
  display: flex;
  align-items: flex-start;
  border-radius: 15px;
}

.message-bubble p {
  font-size: 18px;
  margin-left:10px;
  color: #fff;
}

.chat-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.user-message {
  background-color: #44c7e6;
}

.bot-message {
  background-color: #0091ea;
}

.ipt {
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
}

.ipt textarea.form-control {
  flex-grow: 1;
  width: 100%;
  border: 2px solid #44c7e6;
  border-radius: 15px;
  padding: 10px;
  resize: none;
  box-sizing: border-box;
  font-size: 16px;
}

.ipt .col-xs-12 {
  width: 100%;
  padding: 0;
}

.ipt button {
  padding: 10px 20px;
  border: none;
  background-color: #44c7e6;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 15px;
}

.ipt button:hover {
  background-color: #0091ea;
}
</style>
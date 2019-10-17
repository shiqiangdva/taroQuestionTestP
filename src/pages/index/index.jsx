import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './index.less'
import AddQuestion from './addquestion'

function getStore(key) {
  let str = Taro.getStorageSync(key);
  if (!str) {
    return [];
  }
  return JSON.parse(str);
}

function setStore(key, obj) {
  let str = obj;
  if (typeof obj == 'object') {
    str = JSON.stringify(obj)
  }
  Taro.setStorageSync(key, str);
}

// let arr = getStore('question').map((item, index) => {
//   return { id: parseInt(Math.random()*10000) , ...item }
// })
// setStore('question', arr);

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    showQuestionModel: false,
    questionList: getStore('question')
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 提问事件方法
  addQuestion() {
    this.setState({
      showQuestionModel: true
    })
  }

  closeQuestion() {
    this.setState({
      showQuestionModel: false
    })
  }

  reveiveQuestion(options) {
    let { questionList } = this.state;
    questionList.push({ id: parseInt(Math.random()*10000), ...options});
    this.setState({
      questionList: questionList
    }, () => {
      console.log(this.state.questionList);
      setStore('question', this.state.questionList)
    })
    this.closeQuestion();
  }

  // 投票
  addVote(item) {
    let {questionList} = this.state;
    if(item) {
      item.vote = item.vote ? item.vote + 1 : 1;
    }
    let newArr = questionList.map(listItem => {
      if(listItem.id === item.id) {
        listItem = item;
      }
      return listItem;
    })
    this.setState({
      questionList: newArr 
    }, () => {
      // 持久层更新
      setStore('question', this.state.questionList);
    })
  }

  // 减票
  cutVote(item) {
    let {questionList} = this.state;
    if(item) {
      item.vote = item.vote&&item.vote>0 ? item.vote - 1 : 0;
    }
    let newArr = questionList.map(tmp => {
      if(tmp.id === item.id) {
        tmp = item;
      }
      return tmp;
    });
    this.setState({
      questionList: newArr
    }, () => {
      // 持久层更新
      setStore('question', this.state.questionList);
    })
  }

  render() {
    let { questionList } = this.state;
    // 排序 通过sort方法根据点赞多少进行排序
    let myList = questionList.sort((a, b) => {
      return b.vote - a.vote;
      // a.vote < b.vote
    })
    console.log(myList);

    return (
      <View className='index'>
        <View className='title'>Taro问答实例</View>
        <View className='question-list'>
          {
            myList.map((item, index) => {
              return (
                <View className='question' key={index+1}>
                  <View className='question-left'>
                    <View className='question-title'>{item.title}</View>
                    <View className='question-desc'>{item.desc}</View>
                  </View>

                  <View className='question-right'>
                    <Image className='img' onClick={this.addVote.bind(this, item)} src={require('../../img/yes.png')} />
                    <Text>{item.vote?item.vote:0}</Text>
                    <Image className='img' onClick={this.cutVote.bind(this, item)} src={require('../../img/no.png')} />
                  </View>
                </View>)
            })
          }
        </View>
        {this.state.showQuestionModel ? <AddQuestion onReveiveQuestion={this.reveiveQuestion.bind(this)} onCloseQuestion={this.closeQuestion.bind(this)} /> : null}

        <Button onClick={this.addQuestion.bind(this)} className='btn-question'>提问</Button>
      </View>
    )
  }
}

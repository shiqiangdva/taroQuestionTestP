import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'
import AddQuestion from './addquestion'

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    showQuestionModel: false
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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

  render () {
    return (
      <View className='index'>
        <View className='title'>Taro问答实例</View>
        {this.state.showQuestionModel ? <AddQuestion onCloseQuestion={this.closeQuestion.bind(this)} /> : null}

        <Button onClick={this.addQuestion} className='btn-question'>提问</Button>
      </View>
    )
  }
}

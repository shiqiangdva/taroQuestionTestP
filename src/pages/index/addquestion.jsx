/* eslint-disable react/react-in-jsx-scope */
import Taro, { Component } from "@tarojs/taro";
import { View, Input, Textarea, Button } from "@tarojs/components";
import Dialog from "./dialog";
import './addquestion.less';

export default class AddQuestion extends Component {

    state = {
        desc: ''
    }

    btnCancel() {
        // 需要调用上层组件的方法
        this.props.onCloseQuestion && this.props.onCloseQuestion();
    }

    btnOk() {
        // 点击确定时, 采集数据, 关闭窗体传递数据
        console.log('点击了确定按钮!');
        if(this.state.title && this.state.desc) {
            this.props.onReveiveQuestion && this.props.onReveiveQuestion(this.state);
        } else {
            Taro.showToast({title: '请输入标题或者描述', icon: 'none', duration:  2000})
        }
    }

    changeTitle(e) {
        console.log(e);
        this.setState({
            title: e.target.value
        })
    }

    changeDes(e) {
        console.log(e);
        this.setState({
            desc: e.target.value
        })
    }

    render() {
        return (
            <Dialog>
                <View className='add-question'>
                    <View className='question-body'>
                        <Input focus onInput={this.changeTitle.bind(this)} className='question-title' placeholder='请输入您问题的标题' />
                        <Textarea onInput={this.changeDes.bind(this)} className='question-desc' placeholder='请输入您问题的描述' ></Textarea>
                        <View className='btn-group'>
                            <Button onClick={this.btnOk.bind(this)} className='btn-questions ok'>确定</Button>
                            <Button onClick={this.btnCancel.bind(this)} className='btn-questions cancel'>取消</Button>
                        </View>
                    </View>
                </View>
            </Dialog>
        )
    }
}

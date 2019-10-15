/* eslint-disable react/react-in-jsx-scope */
import { Component } from "@tarojs/taro";
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

    render() {
        return (
            <Dialog>
                <View className='add-question'>
                    <View className='question-body'>
                        <Input className='question-title' placeholder='请输入您问题的标题' />
                        <Textarea className='question-desc' placeholder='请输入您问题的描述' value={this.state.desc}></Textarea>
                        <View className='btn-group'>
                            <Button className='btn-question ok'>确定</Button>
                            <Button onClick={this.btnCancel.bind(this)} className='btn-question cancel'>取消</Button>
                        </View>
                    </View>
                </View>
            </Dialog>
        )
    }
}

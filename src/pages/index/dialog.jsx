import { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './dialog.less';

export default class Dialog extends Component {
    render() {
        return(
        // eslint-disable-next-line react/react-in-jsx-scope
        <View className='dialog'>
            {this.props.children}
        </View>
        )
    }
}
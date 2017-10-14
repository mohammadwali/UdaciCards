import React from 'react'
import {View, Image} from 'react-native'
import {Header as NativeHeader} from 'react-native-elements'


export default function Header({backgroundColor}) {
    const logoSource = require('../images/logo-header.png');
    const Logo = <Image source={logoSource}/>;

    return <View>
        {
            /*
             According to this issue
             https://github.com/react-native-training/react-native-elements/issues/584
             we need to make sure the header is not absolute anymore
             */
        }
        <NativeHeader
            outerContainerStyles={  {
                height: 50,
                padding: 10,
                paddingBottom: 7,
                position: 'relative',
                justifyContent: 'space-around',
                backgroundColor
            } }
            leftComponent={Logo}
        />
    </View>
}
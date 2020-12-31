import {createAppContainer}  from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AppPayment from './pages/AppPayment';

const Routes = createAppContainer(
    createStackNavigator({
        AppPayment: {
            screen: AppPayment,
            navigationOptions:{
                title: 'Welcome'
            }
        }             
    },
    {   
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7D40E7'
            }
        }
    })
)

export default Routes;
import {Notifications, Permissions} from 'expo'

import {getSavedScheduledNotification, saveSavedScheduledNotification} from './storage'


export function setLocalNotification() {
    getSavedScheduledNotification()
        .then(result => {
            if (!result) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(9);
                            tomorrow.setMinutes(0);

                            console.log('Scheduling notification at', tomorrow)

                            Notifications.scheduleLocalNotificationAsync({
                                title: 'Reminder to Study 📚',
                                body: 'Don\'t forget to study your flash cards today 🤓',
                                ios: {
                                    sound: true
                                },
                                android: {
                                    sound: true,
                                    priority: 'high',
                                    sticky: false,
                                    vibrate: true
                                }
                            }, {
                                time: tomorrow,
                                repeat: 'day'
                            });
                            saveSavedScheduledNotification()
                        }
                    })
            }
        })
}
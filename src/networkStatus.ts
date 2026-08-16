import { ElNotification } from 'element-plus'

let notified = false

function handleOffline() {
    notified = true
    ElNotification({
        title: 'You are offline',
        message: 'No internet connection. Some features may be unavailable.',
        type: 'warning',
        duration: 0
    })
}

function handleOnline() {
    if (!notified) return
    notified = false
    ElNotification({
        title: 'Back online',
        message: 'Your internet connection has been restored.',
        type: 'success',
        duration: 4000
    })
}

export function watchNetworkStatus(): void {
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
}

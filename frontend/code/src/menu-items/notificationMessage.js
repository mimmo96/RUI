// assets
import { MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
    MessageOutlined
};

const notificationMessage = {
    id: 'notificationMessage',
    title: 'Notification',
    type: 'group',
    children: [
        {
            id: 'notification',
            title: 'Send Notification',
            type: 'item',
            url: '/notificationMessage',
            icon: icons.MessageOutlined,
            breadcrumbs: false,
        }
    ]
};

export default notificationMessage;

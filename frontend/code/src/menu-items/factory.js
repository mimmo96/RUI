// assets
import { HistoryOutlined, StockOutlined } from '@ant-design/icons';

// icons
const icons = {
    HistoryOutlined,
    StockOutlined
};

const factory = {
    id: 'factory',
    title: 'Factory',
    type: 'group',
    children: [
        {
            id: 'history',
            title: 'Data History',
            type: 'item',
            url: '/history',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'realtime',
            title: 'Real-time Monitoring',
            type: 'item',
            url: '/realtime',
            icon: icons.StockOutlined,
            breadcrumbs: false
        }
    ]
};

export default factory;

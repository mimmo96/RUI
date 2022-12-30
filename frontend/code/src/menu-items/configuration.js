// assets
import { SettingOutlined, FormatPainterOutlined } from '@ant-design/icons';

// icons
const icons = {
    SettingOutlined,
    FormatPainterOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const configuration = {
    id: 'configuration',
    title: 'Configuration',
    type: 'group',
    children: [
        {
            id: 'customization',
            title: 'Customization',
            type: 'item',
            url: '/customization',
            icon: icons.FormatPainterOutlined,
            breadcrumbs: true
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons.SettingOutlined,
            breadcrumbs: true
        }

    ]
};

export default configuration;

import { Button, Dropdown } from "../../../common/components";
import {
    ClockIcon,
    DocIcon,
    HelpIcon,
    TicketIcon,
    VideoIcon,
} from "../../../common/icons";

const { __ } = wp.i18n;

const DocBtn = () => {
    const dropdownItem = [
        {
            key: "help",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    {__("Help Doc", "poptics")}
                </a>
            ),
            icon: <HelpIcon />,
        },
        {
            key: "changelog",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    {__("Change Log", "poptics")}
                </a>
            ),
            icon: <ClockIcon />,
        },
        {
            key: "support",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    {__("Support Ticket", "poptics")}
                </a>
            ),
            icon: <TicketIcon />,
        },
    ];

    return (
        <Dropdown
            menu={{
                items: dropdownItem,
            }}
            placement="bottomLeft"
        >
            <Button
                aria-label={__("doc button", "poptics")}
                className="pt-doc"
                icon={<DocIcon />}
            />
        </Dropdown>
    );
};

export default DocBtn;

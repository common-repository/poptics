export const EmptyTrashIcon = ({
    color = "#FF3B30",
    width = "15",
    height = "15",
}) => {
    return (
        <span className="anticon">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2 4H14"
                    stroke="#1F2937"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M12.6668 4V13.3333C12.6668 14 12.0002 14.6667 11.3335 14.6667H4.66683C4.00016 14.6667 3.3335 14 3.3335 13.3333V4"
                    stroke="#1F2937"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M5.3335 4.00016V2.66683C5.3335 2.00016 6.00016 1.3335 6.66683 1.3335H9.3335C10.0002 1.3335 10.6668 2.00016 10.6668 2.66683V4.00016"
                    stroke="#1F2937"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </span>
    );
};

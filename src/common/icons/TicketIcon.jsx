export const TicketIcon = ({
    color = "#3161F1",
    width = "20",
    height = "20",
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
                    d="M13.0002 8.33317C13.0002 7.41317 13.7468 6.6665 14.6668 6.6665V5.99984C14.6668 3.33317 14.0002 2.6665 11.3335 2.6665H4.66683C2.00016 2.6665 1.3335 3.33317 1.3335 5.99984V6.33317C2.2535 6.33317 3.00016 7.07984 3.00016 7.99984C3.00016 8.91984 2.2535 9.6665 1.3335 9.6665V9.99984C1.3335 12.6665 2.00016 13.3332 4.66683 13.3332H11.3335C14.0002 13.3332 14.6668 12.6665 14.6668 9.99984C13.7468 9.99984 13.0002 9.25317 13.0002 8.33317Z"
                    stroke="#1F2937"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M6.6665 2.6665L6.6665 13.3332"
                    stroke="#1F2937"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="5 5"
                />
            </svg>
        </span>
    );
};

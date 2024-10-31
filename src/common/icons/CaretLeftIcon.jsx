export const CaretLeftIcon = ({
    color = "#0A1018",
    width = "18",
    height = "18",
}) => {
    return (
        <span className="anticon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 26 26"
                fill="none"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.1044 3.73259C16.7295 3.10747 17.743 3.10747 18.3681 3.73259C18.9932 4.35771 18.9932 5.37124 18.3681 5.99636L11.0275 13.3369L18.3681 20.6775C18.9932 21.3026 18.9932 22.3162 18.3681 22.9413C17.743 23.5664 16.7295 23.5664 16.1043 22.9413L7.20711 14.044C6.81658 13.6535 6.81658 13.0204 7.20711 12.6298L16.1044 3.73259Z"
                    fill={color}
                />
            </svg>
        </span>
    );
};

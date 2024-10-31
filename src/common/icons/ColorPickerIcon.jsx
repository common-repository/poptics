export const ColorPickerIcon = ({ color = "#ffffff" }) => {
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
                    d="M14.2348 1.76495C13.7428 1.2749 13.0767 0.999756 12.3823 0.999756C11.6879 0.999756 11.0218 1.2749 10.5298 1.76495L8.99979 3.29995L8.65479 2.95495C8.36173 2.66255 7.96451 2.49855 7.55052 2.49901C7.13654 2.49948 6.73969 2.66439 6.44729 2.95745C6.15489 3.25052 5.99088 3.64773 5.99135 4.06172C5.99182 4.47571 6.15673 4.87255 6.44979 5.16495L6.78979 5.50495L2.78979 9.50495C2.50274 9.79509 2.28729 10.1482 2.16057 10.5362C2.03385 10.9241 1.99934 11.3363 2.05979 11.74L1.45479 12.335C1.18741 12.633 1.04442 13.0222 1.05526 13.4224C1.0661 13.8227 1.22994 14.2036 1.51307 14.4867C1.79619 14.7698 2.17707 14.9336 2.57732 14.9445C2.97757 14.9553 3.36676 14.8123 3.66479 14.545L4.23479 13.97C4.63844 14.0304 5.05062 13.9959 5.43859 13.8692C5.82657 13.7425 6.17965 13.527 6.46979 13.24L10.4998 9.19995L10.8448 9.54495C10.9893 9.68932 11.1608 9.80381 11.3495 9.88188C11.5383 9.95995 11.7405 10.0001 11.9448 9.99995C12.2539 10.0007 12.5562 9.90963 12.8135 9.73827C13.0707 9.56691 13.2713 9.32299 13.3897 9.03746C13.5081 8.75193 13.539 8.43768 13.4784 8.13456C13.4179 7.83144 13.2687 7.55314 13.0498 7.33495L12.7148 6.99995L14.2148 5.47495C14.709 4.98542 14.9887 4.31972 14.9925 3.62409C14.9962 2.92846 14.7237 2.25979 14.2348 1.76495ZM5.75979 12.53C5.55989 12.7312 5.31009 12.8757 5.03596 12.9486C4.76184 13.0215 4.47326 13.0203 4.19979 12.945C4.11251 12.919 4.01982 12.9175 3.9317 12.9404C3.84359 12.9633 3.7634 13.0098 3.69979 13.075L2.95479 13.835C2.9044 13.893 2.8426 13.94 2.77325 13.9731C2.70389 14.0063 2.62846 14.0247 2.55165 14.0274C2.47484 14.0301 2.3983 14.017 2.32678 13.9889C2.25527 13.9607 2.19032 13.9181 2.13597 13.8638C2.08163 13.8094 2.03905 13.7445 2.01089 13.673C1.98273 13.6014 1.9696 13.5249 1.9723 13.4481C1.975 13.3713 1.99349 13.2959 2.0266 13.2265C2.05972 13.1571 2.10676 13.0953 2.16479 13.045L2.92479 12.28C2.98993 12.2163 3.03646 12.1362 3.05937 12.048C3.08228 11.9599 3.0807 11.8672 3.05479 11.78C2.97948 11.5065 2.97821 11.2179 3.05114 10.9438C3.12406 10.6697 3.26855 10.4199 3.46979 10.22L7.49979 6.20995L9.79479 8.49995L5.75979 12.53ZM12.3498 8.83495C12.2977 8.88741 12.2358 8.92904 12.1676 8.95746C12.0994 8.98587 12.0262 9.0005 11.9523 9.0005C11.8784 9.0005 11.8052 8.98587 11.737 8.95746C11.6688 8.92904 11.6068 8.88741 11.5548 8.83495L7.14979 4.45995C7.04625 4.35354 6.98832 4.21093 6.98832 4.06245C6.98832 3.91398 7.04625 3.77137 7.14979 3.66495C7.20185 3.61249 7.26377 3.57086 7.33199 3.54245C7.40022 3.51403 7.47339 3.49941 7.54729 3.49941C7.62119 3.49941 7.69437 3.51403 7.76259 3.54245C7.83081 3.57086 7.89274 3.61249 7.94479 3.66495L12.3498 8.04495C12.453 8.15052 12.5108 8.2923 12.5108 8.43995C12.5108 8.5876 12.453 8.72938 12.3498 8.83495ZM13.5298 4.76495L12.0298 6.28995L9.70479 3.99995L11.2348 2.46495C11.5441 2.18621 11.9486 2.03683 12.3648 2.04763C12.7811 2.05844 13.1773 2.22862 13.4717 2.52304C13.7661 2.81746 13.9363 3.21367 13.9471 3.6299C13.9579 4.04614 13.8085 4.45065 13.5298 4.75995V4.76495Z"
                    fill={color}
                />
            </svg>
        </span>
    );
};

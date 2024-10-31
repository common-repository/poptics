import CloseBtn from "./right-side-settings/components/CloseBtn";

const VisibleInterface = ({ attributes, mode, setAttributes, children }) => {
    const { generalSettings, bodyStyling, overlaySettings } = attributes;

    const {
        popupHeight,
        popupWidth,
        contentPosition,
        clickable = {},
    } = generalSettings;
    const { enabled: clickableEnabled } = clickable;

    const { borderRadius, padding, background, positionType } = bodyStyling;
    const { enable, backgroundColor, closePopupOnClick } = overlaySettings;

    const bodyStyle = {
        height: popupHeight,
        width: popupWidth,
        borderRadius,
        padding,
        backgroundColor: background.types.color,
        ...(background.type === "image" && {
            backgroundImage: `url(${background.types[background.type]})`,
            backgroundPosition: `${background.focalPoint.x * 100}% ${
                background.focalPoint.y * 100
            }%`,
            backgroundSize: "cover",
        }),
        top: `${contentPosition.y * 100}%`,
        left: `${contentPosition.x * 100}%`,
        transform: `translate(-${contentPosition.x * 100}%, -${
            contentPosition.y * 100
        }% )`,
        position: mode !== "edit" ? positionType : "absolute",
        ...(clickableEnabled && mode === "save" && { cursor: "pointer" }),
    };

    const overlayStyle = {
        minHeight: popupHeight,
        ...(enable && { backgroundColor }),
    };

    return (
        <div
            {...(mode === "edit" && {
                className: "pt-style-container",
                style: overlayStyle,
            })}
        >
            {/* ------ Overlay ------- */}
            {mode === "save" && enable ? (
                <div
                    id="popticsOverlay"
                    className="pt-popup-overlay"
                    style={overlayStyle}
                    {...(closePopupOnClick && {
                        "data-close-popup-on-click": true,
                    })}
                />
            ) : null}

            {/* ------ Modal ------- */}
            <div
                id="popticsPopupBody"
                style={bodyStyle}
                className="pt-body-style"
                {...(clickableEnabled && {
                    "data-click-popup-body": JSON.stringify(clickable),
                })}
                {...(clickableEnabled?.count_as_conversion && {
                    "data-count-conversion": true,
                })}
            >
                <CloseBtn
                    mode={mode}
                    setAttributes={setAttributes}
                    generalSettings={generalSettings}
                />
                <div className="pt-popup-body">
                    {background.type === "video" && background.types.video ? (
                        <video
                            src={background.types.video}
                            style={{
                                objectPosition: `${
                                    background.focalPoint.x * 100
                                }% ${background.focalPoint.y * 100}%`,
                            }}
                            playsinline
                            autoPlay
                            muted
                            loop
                            className="pt-popup-video"
                        />
                    ) : null}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default VisibleInterface;

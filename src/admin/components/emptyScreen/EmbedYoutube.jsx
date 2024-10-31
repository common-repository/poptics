const { __ } = wp.i18n;

const EmbedYoutube = ({ videoId }) => {
    return (
        <iframe
            {...(videoId && { src: `/embed/${videoId}` })}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={__("How to create campaign?", "poptics")}
        ></iframe>
    );
};

export default EmbedYoutube;

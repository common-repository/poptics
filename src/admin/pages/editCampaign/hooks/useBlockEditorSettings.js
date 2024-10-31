/**
 * WordPress Dependencies
 */
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";
import { uploadMedia } from "@wordpress/media-utils";

function useBlockEditorSettings() {
    // Determine if the user can create media
    const canUserCreateMedia = useSelect((select) => {
        const _canUserCreateMedia = select("core").canUser("create", "media");
        return _canUserCreateMedia || _canUserCreateMedia !== false;
    }, []);

    // Base settings for the block editor
    const baseSettings = window.popticsEditorSettings || {
        hasFixedToolbar: true,
        blockInspectorAnimation: true,
    };

    // Memoized settings for the block editor, adding media upload settings if the user can create media
    const settings = useMemo(() => {
        if (!canUserCreateMedia) {
            return baseSettings;
        }
        return {
            ...baseSettings,
            mediaUpload({ onError, ...rest }) {
                uploadMedia({
                    wpAllowedMimeTypes: baseSettings.allowedMimeTypes,
                    onError: ({ message }) => onError(message),
                    ...rest,
                });
            },
        };
    }, [canUserCreateMedia, baseSettings]);

    return { settings };
}

export default useBlockEditorSettings;

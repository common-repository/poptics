import { SisternodeOutlined } from "@ant-design/icons";
import customInputMetadata from "./customText.json";

import { customInputAttributes } from "./constant";
import Edit from "./Edit";
import Save from "./Save";

const { name } = customInputMetadata;
const customInputName = name;
export { customInputMetadata, customInputName };

export const customInputSettings = {
    icon: <SisternodeOutlined />,

    attributes: customInputAttributes,
    edit: Edit,
    save: Save,
};

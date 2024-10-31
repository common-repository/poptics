import { FormItem, FormList } from "../../../../../../common/components";
import dayjs from "dayjs";

/**
 * Component for repeating schedule fields.
 * @returns {JSX.Element} Repeating schedule fields with hooks and form items.
 */
const RepeatingScheduleFields = () => {
    return (
        <FormList name="repeating">
            {(fields, { add, remove }) =>
                wp.hooks.applyFilters("repeating_schedule", null, {
                    fields,
                    add,
                    remove,
                    formItemWrapper: ({ params, children }) => (
                        <FormItem {...params}>{children}</FormItem>
                    ), // Wrapper for rendering FormItem components
                    dayjs,
                })
            }
        </FormList>
    );
};

export default RepeatingScheduleFields;

import React from "react";
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput,
} from "react-admin";

import EditToolbar from "../../../core/common/EditToolbar";

/**
 * This component returns block with edit form for Vaccination
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const VaccinationsCreate = props => (
    <Edit title="Edit information about Vaccination" {...props}>
        <SimpleForm toolbar={<EditToolbar />}>
            <TextInput source="vaccinationName" label="Name" />
            <DateInput source="vaccinationDateTime" label="Date and Time" />
            <TextInput source="series" label="Series" />
            <LongTextInput source="comment" label="Comment" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Edit>
);

export default VaccinationsCreate;
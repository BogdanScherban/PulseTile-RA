import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import TopThreeThingsCreate from "./TopThreeThingsCreate";
import TopThreeThingsEdit from "./TopThreeThingsEdit";
import TopThreeThingsShow from "./TopThreeThingsShow";

/**
 * This component returns block with Top Three Things list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TopThreeThingsList = ({ classes, ...rest }) => (
    <ListTemplate
      create={TopThreeThingsCreate}
      edit={TopThreeThingsEdit}
      show={TopThreeThingsShow}
      resourceUrl="top3Things"
      title="Top Three Things"
      {...rest}
    >
        <DateField source="dateCreated" />
        <TextField source="name1" label="Issue #1" />
        <TextField source="name2" label="Issue #2" />
        <TextField source="name3" label="Issue #3" />
        <TextField source="source" label="Source" />
    </ListTemplate>
);

export default TopThreeThingsList;

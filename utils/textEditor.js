export const NODEDEFINITIONS = {
    entity: /(?<entity>\w+)\s*(?:\<(?<parentEntity>\w*)\>)?\s*\{(?:.|\s)*?\}/g,
    property: /(?<name>\w+|\s)\:(?<nullable>\!?)(?<type>string|double|int|map\<\w*\>)/g
}



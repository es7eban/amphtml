/**
 * Get all filtered, anchors
 */
export function getAllSuitableAnchors(ampDoc, digidipOpts){


    let allFiltereddAnchors = [];

    let doc = ampDoc.getRootNode();

    let scope ='';

    if (digidipOpts.clickhandler_attribute!=="" && digidipOpts.element_clickhandler!=="") {

        if (digidipOpts.clickhandler_attribute==='id') {

            scope = '#';

            let tmpRootNodes = doc.querySelectorAll(scope + digidipOpts.element_clickhandler);

        }
        else if (digidipOpts.clickhandler_attribute==='class'  + digidipOpts.element_clickhandler) {

           scope = '.';

            let tmpRootNodes = doc.querySelectorAll(scope + digidipOpts.element_clickhandler);

        }


    }

    return allFiltereddAnchors;

}

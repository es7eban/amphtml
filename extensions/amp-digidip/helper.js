/**
 * Get all scope elements
 */
export function getScopeElements(ampDoc, digidipOpts){

    let doc = ampDoc.getRootNode();

    let scope ='';

    let scopeElements = doc;

    if (digidipOpts.clickhandler_attribute!=="" && digidipOpts.element_clickhandler!=="") {

        if (digidipOpts.clickhandler_attribute==='id') {

            scope = '#';

            scopeElements = doc.querySelectorAll(scope + digidipOpts.element_clickhandler);

        }
        else if (digidipOpts.clickhandler_attribute==='class') {

            scope = '.';

            let classElements = doc.querySelectorAll(scope + digidipOpts.element_clickhandler);

            classElements = Object.keys(classElements).map(function (key) {

                return classElements[key];
            });

            if (classElements.length>0) {

                classElements = classElements.filter(function (item) {

                    for (let i in classElements) {

                        if (classElements[i].contains(item) && classElements[i] !== item) {

                            return false;
                        }
                    }

                    return true;
                });

                scopeElements = classElements

            }

        }

        return scopeElements

    }

}

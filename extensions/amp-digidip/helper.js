/**
 * Get all scope elements
 * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampDoc
 * @param {?Object} digidipOpts
 */
export function getScopeElements(ampDoc, digidipOpts) {

  const doc = ampDoc.getRootNode();

  let scope = '';

  let scopeElements = doc;

  if (digidipOpts.elementClickhandlerAttribute !== '' &&
      digidipOpts.elementClickhandler !== ''
  ) {

    if (digidipOpts.elementClickhandlerAttribute === 'id') {

      scope = '#';

      scopeElements = doc.querySelectorAll(
          scope + digidipOpts.elementClickhandler);

    } else if (digidipOpts.elementClickhandlerAttribute === 'class') {

      scope = '.';

      let classElements = doc.querySelectorAll(
          scope + digidipOpts.elementClickhandler);

      classElements = Object.keys(classElements).map(key => {

        return classElements[key];
      });

      if (classElements.length > 0) {

        classElements = classElements.filter(item => {

          for (const i in classElements) {

            if (classElements[i].contains(item) && classElements[i] !== item) {

              return false;
            }
          }

          return true;
        });

        scopeElements = classElements;

      }
    }

    return scopeElements;

  }

}

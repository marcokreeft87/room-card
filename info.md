{% if installed %}

### Features

{% if version_installed.replace("v", "").replace(".","") | int < 10502  %}
- Fixed `Some custom cards (like gauge and thermostat) gave the error 'n.setConfig is not a function'`
- Added `New version numbering method (1.05.02 in stead of 1.5.2) to make smaller updates possible`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 151  %}
- Fixed `Main entity is no longer required`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 150  %}
- Added `Icon templating (https://github.com/marcokreeft87/room-card/wiki/Configuration#icon-templating)`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 141  %}
- Added `Main entity actions now apply to both title and icon`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 140  %}
- Fixed `Main entity is no longer required`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 139  %}
- Added `Card is tested with jest before making releases`
- Added `Error shown when icon given but show_icon is set to false or not present`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 138  %}
- Fixed `Bug attribute last-changed and last-updated showing 'never'`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 137  %}
- Fixed `Bug icon state_on and state_off not working for input_boolean and switch`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 135  %}
- Fixed `Bug not using the correct attribute when using conditions`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 134  %}
- Fixed `Main entity no longer required`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 133  %}
- Fixed `Fix bug show_icon is ignored`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 132  %}
- Fixed `Bug when show_state is set to false and no icon is set`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 131  %}
- Added `Cleanup and refactor for performance`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 130  %}
- Added `Added multiple row support (https://github.com/marcokreeft87/room-card/wiki/Configuration#rows)`
- Fixed `Name of entity not showing when name is not given`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 127  %}
- Added `Added option 'show_name' to show or hide the name of the entity above the title`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 126  %}
- Added `Fixed a bug causing conditional icons not working for main entity`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 125  %}
- Added `Changed the configuration for hide if (check out https://github.com/marcokreeft87/room-card/wiki/Configuration#hiding)`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 123  %}
- Added `Changed source code to Typescript`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 122  %}
- Added `Added hold_action support`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 121  %}
- Added `Added show_state to show the state beneath the entities (not info_entities)`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 120  %}
- Added `Added conditional styles to the icons`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 110  %}
- Added `Support for conditional icons based on other entities`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 100  %}
- Added `Support for conditional icons`
- Added `Fixed icons aligning center when multiple rows`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 14  %}
- Added `Support for empty title`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 12 %}
- Fix for entity status color
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 11  %}
- Added `Fixed styles config now working for info entities`
- Added `When there are too many entities for one row, the extra entities will be rendered on a new row. Thnx @mihsu81`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10  %}
- Added `Fixed padding for icons on info-entities row`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 9  %}
- Added `hiding entity or info_entity based on an attribute of an entity`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 8  %}
- Added `custom state icons for binary_sensor (icon > state_on / state_off )`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 5  %}
- Added `custom state icons for light and switch domain (icon > state_on / state_off )`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 2  %}
- Added `styles in root config for card styling. Now custom CSS styles to the card is possible`
- Release notes are shown in HACS depending on your installed version
{% endif %}

---
{% endif %}

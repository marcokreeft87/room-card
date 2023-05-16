{% if installed %}

### Features
{% if version_installed.replace("v", "").replace(".","") | int < 10721  %}
- Fixed `entity alongside any type of tap_actions`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10720  %}
- Added `seperated card_styles and main entity styles`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10711  %}
- Added `title actions available without configuring a main entity`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10710  %}
- Fixed `unwanted switching toggle entities while scrolling on phone`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10705  %}
- Fixed `used hide_title in card size calculation`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10704  %}
- Added `card size for correct display`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10703  %}
- Fixed `hide if entities not triggering update`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10702  %}
- Fixed `Upped loader-utils because of security issue with old version`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10701  %}
- Fixed `Entities given in icon conditions not triggering update of card`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10700  %}
- Added `Support for templating for styles`
- Added `Support for templating for title`
- Added `Support for templating for name`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10640  %}
- Added `content_alignment (left, center or right) for rows`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10630  %}
- Added `content_alignment (left, center or right) for entities row`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10621  %}
- Fixed `Cards not updating on every state change`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10620  %}
- Added `Hide_if for cards`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10614  %}
- Fixed `Entity not updating when passed as string and not object`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10613  %}
- Fixed `Refreshing was not happening in editor and some entities`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10612  %}
- Fixed `No more horizontal scrolling when using rows`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10611  %}
- Fixed `When using conditions with attribute it was being cached and use for the next condition`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10610  %}
- Added `Hiding feature for entity rows`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10601  %}
- Fixed `Formatting not working for entities and row entities`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10600  %}
- Added `Notification when entity doest not have attribute given`
- Added `Entity templates to make yaml configs smaller and reduce duplications (https://github.com/marcokreeft87/room-card/wiki/Configuration#templates)`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10504  %}
- Fixed `When giving precision and unit error was thrown`
{% endif %}

{% if version_installed.replace("v", "").replace(".","") | int < 10503  %}
- Fixed `Precision format not working correct when using decimal point locale`
{% endif %}

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

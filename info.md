{% if installed %}

### Features

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

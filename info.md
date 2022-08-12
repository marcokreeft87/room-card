{% if installed %}

### Features

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
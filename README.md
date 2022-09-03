# room-card

[![GH-release](https://img.shields.io/github/v/release/marcokreeft87/room-card.svg?style=flat-square)](https://github.com/marcokreeft87/room-card/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/marcokreeft87/room-card.svg?style=flat-square)](https://github.com/marcokreeft87/room-card/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/marcokreeft87/room-card.svg?color=red&style=flat-square)](https://github.com/marcokreeft87/room-card)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=flat-square)](https://github.com/hacs/integration)

Show multiple entity states, attributes and icons in a single card in Home Assistant's Lovelace UI

**NOTE:** This card is base on the [multiple-entities-card](https://github.com/benct/lovelace-multiple-entity-row)

**NOTE:** This is not a standalone lovelace card, but a row element for the [entities](https://www.home-assistant.io/lovelace/entities/) card.

## Installation

Install using [HACS](https://hacs.xyz/). Search for Room Card in the frontend list, click on download.

_OR_ Manually add [room-card.js](https://raw.githubusercontent.com/marcokreeft87/room-card/master/room-card.js)
to your `<config>/www/` folder and add the following to the `configuration.yaml` file:
```yaml
lovelace:
  resources:
    - url: /local/room-card.js
      type: module
```

## Configuration

This card produces an `room-card` and must therefore be configured as an entity in an [entities](https://www.home-assistant.io/lovelace/entities/) card.

| Name              | Type          | Default                             | Description                                      |
| ----------------- | ------------- | ----------------------------------- | ------------------------------------------------ |
| type              | string        | **Required**                        | `custom:room-card`                     |
| entity            | string        | **Required**                        | Entity ID (`domain.my_entity_id`)                |
| attribute         | string        |                                     | Show an attribute instead of the state value     |
| hide_title        | bool          | `false`                             | Hide the title                                   |
| name              | string/bool   | `friendly_name`                     | Override entity friendly name                    |
| unit              | string/bool   | `unit_of_measurement`               | Override entity unit of measurement              |
| icon              | string        | `icon`                              | Override entity icon or image                    |
|                   | object        |                                     | Override the on or off state icon with state_on / state_off or _[Conditions](#icon-conditions)_       |
| show_icon         | bool          | `false`                             | Show the icon instead of the text based state    |
| image             | string        |                                     | Show an image instead of icon                    |
| toggle            | bool          | `false`                             | Display a toggle (if supported) instead of state |
| show_state        | bool          | `true`                              | Set to `false` to hide the main entity           |
| state_color       | bool          | `false`                             | Enable colored icon when entity is active        |
| column            | bool          | `false`                             | Show entities in a column instead of a row       |
| styles            | object        |                                     | Add custom CSS styles to the state element       |
| format            | string        | _[Formatting](#formatting)_         | Format main state/attribute value                |
|                   |
| entities          | list          | _[Entity Objects](#entity-objects)_ | Additional entity IDs or entity object(s)        |
| info_entities     | list          | _[Entity Objects](#entity-objects)_ | Custom `info_entities` entity                   |
|                   |
| tap_action        | object        | _[Actions](#actions)_               | Custom tap action on entity row and state value  |
| double_tap_action | object        |                                     | Custom double tap action on entity row           |

### Entity Objects

Similarly as the default HA `entities` card, each entity can be specified by an entity ID string,
or by an object which allows more customization and configuration.

If you define entities as objects, either `entity`, `attribute` or `icon` needs to be specified. `entity` is only required if you want
to display data from another entity than the main entity specified above. `attribute` is necessary if you want to display an entity
attribute value instead of the state value. `icon` lets you display an icon instead of a state or attribute value
(works well together with a custom `tap_action`).

| Name             | Type        | Default                     | Description                                                        |
| ---------------- | ----------- | --------------------------- | ------------------------------------------------------------------ |
| entity           | string      |                             | A valid entity_id (or skip to use main entity)                     |
| attribute        | string      |                             | A valid attribute key for the entity                               |
| name             | string/bool | `friendly_name`             | Override entity friendly name (or `false` to hide)                 |
| unit             | string/bool | `unit_of_measurement`       | Override entity unit of measurement (or `false` to hide)           |
| toggle           | bool        | `false`                     | Display a toggle if supported by domain                            |
| icon             | string/bool | `false`                     | Display default or custom icon instead of state or attribute value |
|                   | object        |                                     | Override the on or off state icon with state_on / state_off or _[Conditions](#icon-conditions)_       |
| show_icon         | bool          | `false`                              | Show the icon instead of the text based state    |
| state_color      | bool        | `false`                     | Enable colored icon when entity is active                          |
| hide_unavailable | bool        | `false`                     | Hide entity if unavailable or not found                            |
| hide_if          | object/any  | _[Hiding](#hiding)_         | Hide entity if its value matches specified value or criteria       |
| styles           | object      |                             | Add custom CSS styles to the entity element                        |
| format           | string      | _[Formatting](#formatting)_ | Format entity value                                                |
| tap_action       | object      | _[Actions](#actions)_       | Custom entity tap action                                           |
| double)tap_action       | object      | _[Actions](#actions)_       | Custom entity double tap action                                           |

Note that `hold_action` and `double_tap_action` are currently **not** supported on additional entities.

### Actions

This card supports all the default HA actions. See [Lovelace Actions](https://www.home-assistant.io/lovelace/actions/)
for more detailed descriptions and examples.

| Name            | Type        | Default      | Description                                                                                |
| --------------- | ----------- | ------------ | ------------------------------------------------------------------------------------------ |
| action          | string      | **Required** | `more-info`, `toggle`, `call-service`, `url`, `navigate`, `fire-dom-event`, `none`         |
| entity          | string      |              | Override entity-id when `action` is `more-info`                                            |
| service         | string      |              | Service to call when `action` is `call-service`                                            |
| service_data    | object      |              | Optional data to include when `action` is `call-service`                                   |
| url_path        | string      |              | URL to open when `action` is `url`                                                         |
| navigation_path | string      |              | Path to navigate to when `action` is `navigate`                                            |
| confirmation    | bool/object | `false`      | Enable confirmation dialog                                                                 |
| haptic          | string      | `none`       | Haptic feedback (`success`, `warning`, `failure`, `light`, `medium`, `heavy`, `selection`) |

### Formatting

The `format` option supports the following values:

| Value          | Type        | Description                                                      |
| -------------- | ----------- | ---------------------------------------------------------------- |
| relative       | `timestamp` | Convert value to relative time (`5 minutes ago`)                 |
| total          | `timestamp` | Convert value to relative time (`5 minutes`)                     |
| date           | `timestamp` | Convert timestamp value to date                                  |
| time           | `timestamp` | Convert timestamp value to time                                  |
| datetime       | `timestamp` | Convert timestamp value to date and time                         |
| brightness     | `number`    | Convert brightness value to percentage                           |
| duration       | `number`    | Convert number of seconds to duration (`5:38:50`)                |
| duration-m     | `number`    | Convert number of milliseconds to duration (`5:38:50`)           |
| invert         | `number`    | Convert number from positive to negative or vice versa           |
| kilo           | `number`    | Divide number value by 1000 (ex. `1500 W` -> `1.5 kW`)           |
| position       | `number`    | Reverses a position percentage (ex. `70%` open -> `30%` closed)  |
| precision<0-9> | `number`    | Set decimal precision of number value (`precision3` -> `18.123`) |

### Hiding

The `hide_if` option can be used to hide an entity if its state or attribute value matches the specified criteria.
It can be used directly with a string, number or boolean value (i.e. `hide_if: 'off'`), as a list with several values,
or as an object with one or more of the options listed below.

| Name    | Type     | Description                                                     |
| ------- | -------- | --------------------------------------------------------------- |
| above   | number   | Hidden if entity _number_ value is above the specified value    |
| below   | number   | Hidden if entity _number_ value is below the specified value    |
| value   | list/any | Hidden if value matches specified value or any value in a list  |
| entity  | string   | Name of the entity the state will hide the entity in the card   |
| state   | string   | State of the entity the state will hide the entity in the card  |


### Icon conditions

The `icon` can be customized based on conditions.

| Name    | Type     | Description                                                     |
| ------- | -------- | --------------------------------------------------------------- |
| above   | any      | Use the given icon if the state or attribute above the specified value    |
| below   | any      | Use the given icon if the state or attribute below the specified value    |
| equals  | any      | Hidden if entity _number_ value is equal to the specified value    |
| value   | any      | Hidden if value matches specified value or any value in a list  |
| attribute   | string   | Use the value of this attribute to determine the above/below/equals equation  |

For example:

```yaml
- entity: sensor.node_21_humidity
  show_icon: true
  icon:
    conditions:
      - icon: mdi:car
        condition: above
        value: 20
      - icon: mdi:car-2-plus
        condition: above
        value: 30
      - icon: mdi:car-3-plus
        condition: below
        value: 50
      - icon: mdi:car-arrow-left
        condition: equals
        attribute: state
        value: 35.6      
      - icon: phu:lift-in-window-open1
        condition: above
        entity: sensor.bathroom1_window_sensor_tilt
        value: 0

```

## Examples

![room-card](https://raw.githubusercontent.com/marcokreeft87/room-card/master/example.png)

```yaml
- type: custom:room-card
  title: Mancave
  entity: group.mancave_lights
  icon: mdi:lightbulb-outline
  tap_action:
    action: toggle
  entities:
    - entity: light.mancave
      name: Ceiling
      hide_if:
        entity: sensor.light_unavailable
        state: true
      tap_action:
        action: toggle
    - entity: light.desk
      name: Desk
      icon: mdi:desk
      tap_action:
        action: toggle
    - entity: light.wardrobe
      name: Wardrobe
      icon: mdi:wardrobe-outline
      tap_action:
        action: toggle
    - entity: light.monitor
      name: Monitor
      icon: mdi:monitor-shimmer
      tap_action:
        action: toggle
    - entity: climate.radiator
      name: Radiator
      tap_action:
        action: toggle
  info_entities:
    - entity: binary_sensor.motion_sensor
      show_icon: true
      hide_if:
        entity: sensor.motion_sensor_unavailable
        state: true
    - entity: binary_sensor.window
      show_icon: true
      icon:
        state_on: mdi:window-open
        state_off: mdi:window-closed
    - sensor.motion_sensor_illuminance
    - sensor.motion_sensor_temperature
  cards:
    - type: custom:simple-thermostat
      entity: climate.radiator_mancave
      show_states:
        - heat
      name: Radiator
      title: Mancave
      control:
        _headings: true
        _icons: true
        _names: true
        hvac:
          heat:
            icon: mdi:fire
            name: On
          'off':
            icon: mdi:power
            name: Off

- type: custom:room-card
  title: Living
  entity: group.living_lights
  tap_action:
    action: toggle
  icon: mdi:lightbulb-outline
  entities:
    - entity: light.couch
      name: Couch
      icon: mdi:sofa-outline
      tap_action:
        action: toggle
    - entity: light.table
      name: Table
      icon: mdi:table-chair
      tap_action:
        action: toggle
    - entity: light.tv
      name: TV
      icon: mdi:television
      tap_action:
        action: toggle
    - entity: light.living_ceiling
      name: Ceiling
      icon: mdi:wall-sconce-flat
      tap_action:
        action: toggle
    - entity: media_player.chromecast_living
      name: Chromecast
    - entity: media_player.stb_arris_uhd
      name: Ziggo
  info_entities:
    - entity: media_player.googlehome
      show_icon: true
      icon: mdi:google-home
    - entity: binary_sensor.smoke_sensor
      show_icon: true
    - sensor.smoke_sensor_air_temperature
  cards:
    - type: custom:mini-media-player
      entity: media_player.chromecast_living
      show_states:
        - playing
        - paused
    - type: custom:mini-media-player
      entity: media_player.stb_arris_uhd
      show_states:
        - playing
        - paused
    - type: custom:mini-media-player
      entity: media_player.googlehome
      show_states:
        - playing
        - paused

- type: custom:room-card
  title: Hall
  icon: mdi:wall-sconce-flat
  entity: light.lamp_overloop
  tap_action:
    action: toggle
  info_entities:
    - entity: binary_sensor.smoke_sensor
      show_icon: true
    - entity: binary_sensor.motion_sensor
      show_icon: true
    - sensor.motion_sensor_illuminance_2
    - sensor.motion_sensor_air_temperature_2
- type: custom:room-card
  title: Bedroom
  entity: group.bedroom_lights
  icon: mdi:floor-lamp-outline
  tap_action:
    action: toggle
  entities:
    - entity: light.left
      name: Left
      icon: mdi:floor-lamp-outline
      tap_action:
        action: toggle
    - entity: light.right
      name: Right
      icon: mdi:floor-lamp-outline
      tap_action:
        action: toggle
    - entity: media_player.chromecast
      name: Chromecast
    - entity: media_player.google_home
      icon: mdi:google-home
      name: Google
  cards:
    - type: custom:mini-media-player
      entity: media_player.chromecast
      show_states:
        - playing
    - type: custom:mini-media-player
      entity: media_player.google_home
      show_states:
        - playing
        - paused
    - title: null
      type: glance
      entity: binary_sensor.hp_printer_connectivity
      entities:
        - entity: binary_sensor.hp_printer_connectivity
          name: Connected
        - entity: sensor.hp_printer_status
          name: Status
        - entity: sensor.hp_printer_inkcartridge_black
          name: Black
        - entity: sensor.hp_printer_inkcartridge_cyanmagentayellow
          name: Color

- type: custom:room-card
  title: Attic + Garden
  entity: light.attic
  icon: mdi:lightbulb-outline
  tap_action:
    action: toggle
  info_entities:
    - entity: light.attic
      icon: mdi:wall-sconce-flat
      show_icon: true
      tap_action:
        action: toggle
    - entity: light.garden
      icon: mdi:outdoor-lamp
      show_icon: true
      tap_action:
        action: toggle
```

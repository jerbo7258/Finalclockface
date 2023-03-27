function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Demo Settings</Text>}>
        <Toggle
          settingsKey="toggle"
          label="Toggle Switch"
        />
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "darkslategrey"}, {color: "dimgrey"}, {color: "grey"}, {color: "lightgrey"}, {color: "beige"}, {color: "white"}, {color: "maroon"},  {color: "saddlebrown"}, {color: "darkgoldenrod"}, {color: "goldenrod"}, {color: "rosybrown"}, {color: "wheat"}, {color: "navy"}, {color: "blue"}, {color: "dodgerblue"}, {color: "deepskyblue"}, {color: "aquamarine"}, {color: "cyan"}, {color: "olive"}, {color: "darkgreen"}, {color: "green"}, {color: "springgreen"}, {color: "limegreen"}, {color: "palegreen"}, {color: "lime"}, {color: "greenyellow"}, {color: "darkslateblue"}, {color: "slateblue"}, {color: "fuchsia"}, {color: "purple"}, {color: "plum"}, {color: "orchid"}, {color: "lavender"}, {color: "darkkhaki"}, {color: "khaki"}, {color: "lemonchiffon"}, {color: "yellow"}, {color: "gold"}, {color: "orangered"}, {color: "orange"}, {color: "coral"}, {color: "lightpink"}, {color: "palevioletred"}, {color: "deeppink"}, {color: "darkred"}, {color: "crimson"}, {color: "red"}
          ]}
        />
        </Section>
        <Section title={<Text bold align="center">Text Color</Text>}>
 
<ColorSelect
          settingsKey="textcolor"
          colors={[
            {color: "darkslategrey"}, {color: "dimgrey"}, {color: "grey"}, {color: "lightgrey"}, {color: "beige"}, {color: "white"}, {color: "maroon"},  {color: "saddlebrown"}, {color: "darkgoldenrod"}, {color: "goldenrod"}, {color: "rosybrown"}, {color: "wheat"}, {color: "navy"}, {color: "blue"}, {color: "dodgerblue"}, {color: "deepskyblue"}, {color: "aquamarine"}, {color: "cyan"}, {color: "olive"}, {color: "darkgreen"}, {color: "green"}, {color: "springgreen"}, {color: "limegreen"}, {color: "palegreen"}, {color: "lime"}, {color: "greenyellow"}, {color: "darkslateblue"}, {color: "slateblue"}, {color: "purple"}, {color: "fuchsia"}, {color: "purple"}, {color: "plum"}, {color: "orchid"}, {color: "lavender"}, {color: "darkkhaki"}, {color: "khaki"}, {color: "lemonchiffon"}, {color: "yellow"}, {color: "gold"}, {color: "orangered"}, {color: "orange"}, {color: "coral"}, {color: "lightpink"}, {color: "palevioletred"}, {color: "deeppink"}, {color: "darkred"}, {color: "crimson"}, {color: "red"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);


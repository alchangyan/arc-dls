// import React from 'react';
// import PropTypes from 'prop-types';
// import Radio from 'antd/lib/radio';
// import { STORY_CHANGED } from '@storybook/core-events';
// import constants from './constants';

// class StoryThemeProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       theme: constants.DEFAULT_THEME,
//     };
//   }

//   componentDidMount() {
//     const { api } = this.props;
//     this.removeStoryListener = api.on(STORY_CHANGED, () =>
//       this.changeTheme({ target: { value: constants.DEFAULT_THEME } }),
//     );
//   }

//   componentWillUnmount() {
//     if (this.removeStoryListener) {
//       this.removeStoryListener();
//     }
//   }

//   changeTheme = ({ target: { value: theme } }) => {
//     if (this.state.theme !== theme) {
//       this.setState({ theme }, this.emitThemeChange);
//     }
//   };

//   emitThemeChange = () => {
//     const { channel } = this.props;
//     const { theme } = this.state;
//     channel.emit(constants.CHANGE_THEME, theme);
//   };

//   render() {
//     const { isActive } = this.props;
//     const { theme } = this.state;

//     if (!isActive) {
//       return null;
//     }

//     console.log(this.state)

//     return (
//       <Radio.Group onChange={this.changeTheme} style={{ margin: 10 }}>
//         {constants.THEMES.map(storyTheme => (
//           <Radio
//             key={storyTheme}
//             value={storyTheme}
//             checked={storyTheme === theme}
//             style={{
//               display: 'block',
//               margin: 10,
//               textTransform: 'capitalize',
//             }}
//           >
//             {storyTheme}
//           </Radio>
//         ))}
//       </Radio.Group>
//     );
//   }
// }

// StoryThemeProvider.propTypes = {
//   api: PropTypes.shape().isRequired,
//   channel: PropTypes.shape().isRequired,
//   isActive: PropTypes.bool.isRequired,
// };

// export default StoryThemeProvider;


import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';

export default makeDecorator({
  name: 'withMyAddon',
  parameterName: 'myParameter',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    // Our API above sets the notes parameter to a string,
    // which we send to the channel
    channel.emit('change-theme', parameters);
    // we can also add subscriptions here using channel.on('eventName', callback);

    return <div className="wrapper" >{getStory(context)}</div>;
  }
})
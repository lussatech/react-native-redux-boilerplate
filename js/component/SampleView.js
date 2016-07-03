/**
 * Copyright 2016 PT. Lussa Teknologi Global.
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * ( the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule SampleView
 * @flow
 */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var TextInput = require('TextInput');
var TouchableHighlight = require('TouchableHighlight');
var TouchableNativeFeedback = require('TouchableNativeFeedback');
var Platform = require('Platform');
var Text = require('Text');

var {changeTitle} = require('../actions');

var { connect } = require('react-redux');

type Props = {
  text: string;
  changeTitle: (text: string) => void;
};

type State = {
  text: string;
  height: number;
}

class SampleView extends React.Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {text: this.props.text, height: 0};
    (this:any).changeTitle = this.changeTitle.bind(this);
  }

  changeTitle() {
    this.props.changeTitle(this.state.text);
  }

  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.welcome}>
           Redux Boilerplate
         </Text>

         <View style={styles.experiment}>
           <Text style={styles.instructions}>
             This change because of {"\n"} action->reducer->store:
           </Text>
           <Text style={styles.result}>
             {this.props.text}
           </Text>

           <Text style={styles.instructions}>
             This change because of state:
           </Text>
           <Text style={styles.result}>
             {this.state.text}
           </Text>
         </View>

         <TextInput
          placeholder="try changing the text here"
          style={styles.textInput}
          multiline={true}
          clearTextOnFocus={true}
          onChange={(event) => {
            this.setState({ text: event.nativeEvent.text, height: event.nativeEvent.contentSize.height, });
          }}
         />
         <TouchableHighlight
           onPress={this.changeTitle}
           >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Change Title!</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  experiment: {
    marginTop: 20,
    marginBottom: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  button: {
    marginTop: 7,
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#000000',
    margin: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    textAlign: 'center',
    height: 50,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});

function store(store) {
  return {
    text: store.sample.text,
  };
}

function actions(dispatch) {
  return {
    changeTitle: (text) => dispatch(changeTitle(text)),
  }
}

module.exports =  connect(store, actions)(SampleView);

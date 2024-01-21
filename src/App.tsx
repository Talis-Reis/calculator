import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';

import Button from './components/Button'
import Display from './components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

class App extends Component {

    state = { ...initialState }

    addDigit = (value: string) => {
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        if (value === '.' && !clearDisplay
            && this.state.displayValue.includes('.')) {
            return
        }
        const current = clearDisplay ? '' : this.state.displayValue
        const displayValue = current + value

        this.setState({ displayValue, clearDisplay: false })

        if (value !== '.') {
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[this.state.current] = newValue
            this.setState({ values })
        }
    }

    clearMemory = (value: string) => {
        this.setState({ ...initialState })
    }

    setOperation = (operation: string) => {
        if (this.state.current === 0) {
            this.setState({
                operation,
                current: 1,
                clearDisplay: true
            })
        } else {
            const equals = operation === '='
            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
            } catch (err) {
                values[0] = this.state.values[0]
            }

            values[1] = 0
            this.setState({
                displayValue: `${values[0]}`,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: true,
                values,
            })

        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Display value={this.state.displayValue} />
                <View style={styles.buttons}>
                    <Button label='AC' triple onClick={this.clearMemory} />
                    <Button label='/' operationButton onClick={this.setOperation} />
                    <Button label='7' onClick={this.addDigit} />
                    <Button label='8' onClick={this.addDigit} />
                    <Button label='9' onClick={this.addDigit} />
                    <Button label='*' operationButton onClick={this.setOperation} />
                    <Button label='4' onClick={this.addDigit} />
                    <Button label='5' onClick={this.addDigit} />
                    <Button label='6' onClick={this.addDigit} />
                    <Button label='-' operationButton onClick={this.setOperation} />
                    <Button label='1' onClick={this.addDigit} />
                    <Button label='2' onClick={this.addDigit} />
                    <Button label='3' onClick={this.addDigit} />
                    <Button label='+' operationButton onClick={this.setOperation} />
                    <Button label='0' double onClick={this.addDigit} />
                    <Button label='.' onClick={this.addDigit} />
                    <Button label='=' operationButton onClick={this.setOperation} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default App;

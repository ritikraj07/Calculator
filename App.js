import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, SafeAreaView, Switch, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';
import GetData from './getter';
import Setdata from './setter';

export default function App() {
  const [text, settext] = useState("0")
  const [opt, setopt] = useState("")
  const [Result, setResult] = useState("")
  const [history, sethistory] = useState([])
  const [a, seta] = useState(0)
  useEffect(() => {
    GetData('history')
      .then((res) => {
        if (res) {
          sethistory(res)
        }
      })
  }, [])
  let calculate = () => {
    let res = 0
    switch (opt) {
      case '+':
        res = +text + +Result
        break
      case 'X':
        res = +text * +Result
        break
      case '-':
        res = +Result - +text
        break
      case '÷':
        res = (Result / text).toFixed(2)
        break

    }
    setResult(res.toString())
    settext(0)

  }

  let GetInput = (e) => {
    if (e >= 0 || e <= 9 || e == '.') {
      if (text == '0') {
        if (e == '.') {
          settext('0.')
        } else {
          settext(e)
        }

      }
      else {
        let newtext = text + '' + e
        settext(newtext)
      }
    } else if ((e == '+' || e == 'X' || e == '-' || e == '÷') && Result == '') {
      setResult(text)
      setopt(e)
      settext(0)
    }
    else if ((e == '+' || e == 'X' || e == '-' || e == '÷') && Result != '') {
      if (text > 0) {
        calculate()
      }
      setopt(e)
    }
    else if (e == 'erase' && text.length > 0) {
      settext(text.slice(0, -1))
    }
    else if (e == 'Mc') {
      sethistory([])
      Setdata('history', [])
    }
    else if (e == 'Ms' && Result.length != 0) {
      sethistory([...history, Result])
      Setdata('history', history)
    }
    else if (e == 'M+' && a < history.length - 1) {
      seta(a + 1)
    }

    else if (e == 'M-' && a > 0) {
      seta(a - 1)
    }
  }
  let Negative = () => {
    if (text == '0') {
      settext('-')
    } else {
      settext('-' + text)
    }

  }




  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.display}>
        {history.length != 0 && <View style={{ alignSelf: 'flex-start', width: '100%', height: '80%' }} >
          <Text style={{ fontSize: 20, fontWeight: 600 }} >History Results: {history[a]}</Text>
        </View>}
        <Text style={{ fontSize: 20, fontWeight: 700 }} >{Result + " " + opt}</Text>
        <Text style={{ fontSize: 35, fontWeight: 700 }} >{text}</Text>
      </SafeAreaView>
      <View>
        <View style={styles.btmrow}>
          <TouchableOpacity
            onPress={() => GetInput('Mc')} style={[styles.btm, { backgroundColor: '#ff0000' }]}>
            <Text style={styles.btmText} >Mc</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('M+')} style={[styles.btm, { backgroundColor: '#0055ff' }]}>
            <Text style={styles.btmText} > M+ </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('M-')} style={[styles.btm, { backgroundColor: '#0055ff' }]}>
            <Text style={styles.btmText} > M- </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => GetInput('Ms')} style={[styles.btm, { backgroundColor: '#ff0000' }]}>
            <Text style={styles.btmText} >Ms</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btmrow}>
          <TouchableOpacity onPress={() => GetInput(7)} style={styles.btm}>
            <Text style={styles.btmText} > 7 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(8)} style={styles.btm}>
            <Text style={styles.btmText} > 8 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(9)} style={styles.btm}>
            <Text style={styles.btmText} > 9 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('÷')} style={styles.btm}>
            <Text style={[styles.btmText, { fontSize: 40, marginTop: -10 }]} > ÷ </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btmrow}>
          <TouchableOpacity onPress={() => GetInput(4)} style={styles.btm}>
            <Text style={styles.btmText} > 4 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(5)} style={styles.btm}>
            <Text style={styles.btmText} > 5 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(6)} style={styles.btm}>
            <Text style={styles.btmText} > 6 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('X')} style={styles.btm}>
            <Text style={styles.btmText} > X </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btmrow}>
          <TouchableOpacity onPress={() => GetInput(1)} style={styles.btm}>
            <Text style={styles.btmText} > 1 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(2)} style={styles.btm}>
            <Text style={styles.btmText} > 2 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(3)} style={styles.btm}>
            <Text style={styles.btmText} > 3 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('+')} style={styles.btm}>
            <Text style={[styles.btmText, { fontSize: 40, marginTop: -8 }]} > + </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btmrow}>
          <TouchableOpacity onPress={() => settext(Math.sqrt(text))} style={styles.btm}>
            <Text style={styles.btmText} > 1/x² </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput(0)} style={styles.btm}>
            <Text style={styles.btmText} > 0 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settext(text * text)} style={styles.btm}>
            <Text style={styles.btmText} > x² </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('-')} onLongPress={() => Negative()} style={styles.btm}>
            <Text style={[styles.btmText, { fontSize: 50, marginTop: -13 }]} > - </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btmrow}>
          <TouchableOpacity onPress={() => {
            setResult("")
            setopt("")
            settext("0")
          }} style={[styles.btm, { backgroundColor: '#ff0066' }]}>
            <Text style={[styles.btmText]} > AC </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('erase')} style={[styles.btm, { backgroundColor: '#ff0066' }]}>
            <Ionicons name='backspace' size={25} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GetInput('.')} style={styles.btm}>
            <Text style={styles.btmText} > . </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => calculate()} style={[styles.btm, { backgroundColor: '#4dff4d' }]}>
            <Text style={[styles.btmText, { fontSize: 50, marginTop: -13 }]} > = </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    // backgroundColor: '#ffffff',

  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    borderBottomColor: 'red',
    alignItems: 'flex-end',
    margin: 10,
    // borderWidth:2
  },
  btmrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  btm: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2
  },
  btmText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 800
  }
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ZaggyLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'symbol' | 'text';
  color?: 'default' | 'white' | 'dark';
}

export default function ZaggyLogo({ 
  size = 'medium', 
  variant = 'full', 
  color = 'default' 
}: ZaggyLogoProps) {
  const getLogoSize = () => {
    switch (size) {
      case 'small': return { fontSize: 20, height: 24 };
      case 'large': return { fontSize: 32, height: 40 };
      default: return { fontSize: 24, height: 32 };
    }
  };

  const getLogoColor = () => {
    switch (color) {
      case 'white': return '#FFFFFF';
      case 'dark': return '#202124';
      default: return '#FF6B35';
    }
  };

  const logoSize = getLogoSize();
  const logoColor = getLogoColor();

  if (variant === 'symbol') {
    return (
      <View style={[styles.symbolContainer, { height: logoSize.height }]}>
        <Text style={[styles.symbol, { fontSize: logoSize.fontSize, color: logoColor }]}>
          Z
        </Text>
        <View style={[styles.arrow, { borderLeftColor: logoColor }]} />
      </View>
    );
  }

  if (variant === 'text') {
    return (
      <Text style={[styles.textOnly, { fontSize: logoSize.fontSize, color: logoColor }]}>
        Zaggy
      </Text>
    );
  }

  return (
    <View style={styles.fullLogo}>
      <View style={[styles.symbolContainer, { height: logoSize.height }]}>
        <Text style={[styles.symbol, { fontSize: logoSize.fontSize, color: logoColor }]}>
          Z
        </Text>
        <View style={[styles.arrow, { borderLeftColor: logoColor }]} />
      </View>
      <Text style={[styles.text, { fontSize: logoSize.fontSize, color: logoColor }]}>
        aggy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fullLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  symbol: {
    fontWeight: '900',
    letterSpacing: -1,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  text: {
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  textOnly: {
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});
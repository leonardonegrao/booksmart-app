import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Link, Slot, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BookmarkIcon, LibraryIcon, SettingsIcon, UploadBookIcon } from '@/components/icons';

type Tab = 'library' | 'upload' | 'history' | 'settings'

const tabList = [
  { id: 'library', label: 'Library', href: '/', icon: LibraryIcon },
  { id: 'upload', label: 'Upload', href: '/upload', icon: UploadBookIcon },
  { id: 'history', label: 'History', href: '/history', icon: BookmarkIcon },
  { id: 'settings', label: 'Settings', href: '/settings', icon: SettingsIcon },
]

function TabItem({ children, label, isActive }: { children: React.ReactNode; label: string; isActive: boolean; }) {
  return (
    <View style={styles.tab}>
      {children}
      <Text
        style={{
          ...styles.tabLabel,
          color: isActive ? '#FF9D42' : '#939393',
          fontFamily: isActive ? 'Inter_600SemiBold' : 'Inter_400Regular',
        }}
      >
        {label}
      </Text>
    </View>
  )
}

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('library')

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.layout}>
        <Slot />
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {tabList.map(({ id, label, icon }) => (
              <TabItem key={id}  label={label} isActive={activeTab === id}>
                <Pressable onPress={() => setActiveTab(id as Tab)}>
                  {icon({
                    color: activeTab === id ? '#FF9D42' : '#939393',
                    strokeWidth: activeTab === id ? 1.5 : 1.0,
                  })}
                </Pressable>
              </TabItem>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
    backgroundColor: '#FAFAFA'
  },
  tabsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    gap: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingVertical: 4,
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3F3F3F0A',
    shadowColor: '#1e1e1e',
    shadowRadius: 18,
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 8,
      width: 0,
    }
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontSize: 12,
  }
})
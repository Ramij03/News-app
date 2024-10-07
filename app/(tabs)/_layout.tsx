import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown:false
        }}
      />
    </Tabs>
  )
}

export default TabLayout
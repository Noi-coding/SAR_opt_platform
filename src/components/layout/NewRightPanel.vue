<template>
  <aside class="new-right-panel">
    <div class="panel-header">
      <div class="panel-tabs">
        <div 
          v-for="tab in tabs"
          :key="tab.id"
          class="panel-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-text">{{ tab.text }}</span>
        </div>
      </div>
    </div>

    <div class="panel-content">
      <div v-show="activeTab === 'overview'" class="tab-content">
        <OverviewPanel />
      </div>

      <div v-show="activeTab === 'data'" class="tab-content">
        <DataManagementPanel />
      </div>

      <div v-show="activeTab === 'registration'" class="tab-content">
        <RegistrationPanel />
      </div>

      <div v-show="activeTab === 'pre'" class="tab-content">
        <HouseArchivePanel />
      </div>

      <div v-show="activeTab === 'during'" class="tab-content">
        <ChangeDetectionPanel />
      </div>

      <div v-show="activeTab === 'post'" class="tab-content">
        <PostDisasterPanel />
      </div>

      <div v-show="activeTab === 'verify'" class="tab-content">
        <VerificationPanel />
      </div>

      <div v-show="activeTab === 'report'" class="tab-content">
        <ReportPanel />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, computed, inject } from 'vue';
import OverviewPanel from '../modules/OverviewPanel.vue';
import DataManagementPanel from '../modules/DataManagementPanel.vue';
import RegistrationPanel from '../modules/RegistrationPanel.vue';
import HouseArchivePanel from '../modules/HouseArchivePanel.vue';
import ChangeDetectionPanel from '../modules/ChangeDetectionPanel.vue';
import PostDisasterPanel from '../modules/PostDisasterPanel.vue';
import VerificationPanel from '../modules/VerificationPanel.vue';
import ReportPanel from '../modules/ReportPanel.vue';

const activeTab = ref('overview');
const activeModule = inject('activeModule', ref('dashboard'));

const tabs = [
  { id: 'overview', icon: '📊', text: '概览' },
  { id: 'data', icon: '📁', text: '数据' },
  { id: 'registration', icon: '🔗', text: '配准' },
  { id: 'pre', icon: '🏠', text: '建档' },
  { id: 'during', icon: '⚡', text: '识别' },
  { id: 'post', icon: '📈', text: '研判' },
  { id: 'verify', icon: '✅', text: '核验' },
  { id: 'report', icon: '📄', text: '报告' }
];

watch(activeModule, (newVal: string) => {
  if (newVal === 'dashboard') activeTab.value = 'overview';
  else if (newVal === 'data') activeTab.value = 'data';
  else if (newVal === 'registration') activeTab.value = 'registration';
  else if (newVal === 'pre') activeTab.value = 'pre';
  else if (newVal === 'during') activeTab.value = 'during';
  else if (newVal === 'post') activeTab.value = 'post';
  else if (newVal === 'verify') activeTab.value = 'verify';
  else if (newVal === 'report') activeTab.value = 'report';
});
</script>

<style lang="scss" scoped>
.new-right-panel {
  position: absolute;
  top: 80px;
  right: 16px;
  bottom: 95px;
  width: 360px;
  background: rgba(8, 20, 45, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 180, 255, 0.25);
  border-radius: 12px;
  z-index: 900;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
}

.panel-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.panel-tab {
  flex: 1 1 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 6px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  transition: all 0.3s;
  text-align: center;

  &:hover {
    background: rgba(0, 150, 255, 0.1);
    color: #00e5ff;
  }

  &.active {
    background: linear-gradient(135deg, rgba(0, 198, 255, 0.2), rgba(0, 114, 255, 0.1));
    color: #00e5ff;
    border: 1px solid rgba(0, 180, 255, 0.3);
  }

  .tab-icon {
    font-size: 14px;
  }
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.tab-content {
  height: 100%;
}
</style>

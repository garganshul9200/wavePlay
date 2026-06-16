import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenBackground} from '../components/ScreenBackground';
import {colors, radius, spacing, typography} from '../theme';

const FEATURES = [
  {
    icon: '🎧',
    title: 'Background Playback',
    description:
      'Audio keeps playing when you switch tabs or send the app to the background.',
  },
  {
    icon: '📡',
    title: 'API-Ready Architecture',
    description:
      'Tracks are fetched through a service layer and can be swapped with any REST API.',
  },
  {
    icon: '🎛️',
    title: 'Persistent Mini Player',
    description:
      'A floating mini player stays visible above the tab bar for quick control.',
  },
  {
    icon: '🔔',
    title: 'System Controls',
    description:
      'Lock screen and notification controls powered by react-native-video.',
  },
];

export function HomeScreen() {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>React Native Audio Demo</Text>
          </View>

          <Text style={styles.heroTitle}>WavePlay</Text>
          <Text style={styles.heroSubtitle}>
            A polished background audio player built with react-native-video,
            React Context, and React Navigation.
          </Text>

          <View style={styles.statsRow}>
            <StatCard label="Engine" value="Video" />
            <StatCard label="Tabs" value="2" />
            <StatCard label="Tracks" value="3" />
          </View>

          <Text style={styles.sectionLabel}>Highlights</Text>
          <View style={styles.featureGrid}>
            {FEATURES.map(feature => (
              <View key={feature.title} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureBody}>{feature.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Try it out</Text>
            <Text style={styles.tipBody}>
              Open the Player tab, start a track, then come back here. Playback
              continues seamlessly while the mini player stays pinned above the
              navigation bar.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function StatCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderActive,
  },
  heroBadgeText: {
    ...typography.caption,
    color: colors.accentLight,
  },
  heroTitle: {
    ...typography.hero,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  featureGrid: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  featureCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  featureTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featureBody: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: colors.cyanSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.22)',
  },
  tipTitle: {
    ...typography.subtitle,
    color: colors.cyan,
    marginBottom: spacing.xs,
  },
  tipBody: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

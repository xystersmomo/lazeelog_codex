//
//  TimerScreen.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import SwiftUI

struct TimerScreen: View {
    @StateObject var viewModel: TimerViewModel

    private var categoryColor: Color {
        viewModel.category(by: viewModel.selectedCategoryId)?.color ?? Theme.Colors.borderHi
    }

    var body: some View {
        ZStack(alignment: .bottom) {
            Theme.Colors.bg.ignoresSafeArea()

            VStack(spacing: 24) {
                Text("LazeeLog")
                    .foregroundStyle(Theme.Colors.text)
                    .font(.system(size: 22, weight: .bold))

                TrackButton(
                    color: categoryColor,
                    label: centerLabel,
                    subLabel: helperLabel,
                    holdProgress: viewModel.holdProgress,
                    onTap: viewModel.onMainTap,
                    onHoldStart: viewModel.startHold,
                    onHoldCancel: viewModel.cancelHold
                )

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(Category.seed) { cat in
                            Button(cat.name) {
                                viewModel.selectedCategoryId = cat.id
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 8)
                            .background(cat.color.opacity(viewModel.selectedCategoryId == cat.id ? 0.9 : 0.4))
                            .clipShape(Capsule())
                            .foregroundStyle(Color.black)
                            .font(.system(size: 12, weight: .bold))
                        }
                    }
                }
                .padding(.horizontal, 20)

                Spacer()
            }
            .padding(.top, 40)

            HistorySheet(sessions: viewModel.sessions)
                .padding(.horizontal, 12)
        }
    }

    private var centerLabel: String {
        switch viewModel.state {
        case .idle:
            return viewModel.category(by: viewModel.selectedCategoryId)?.name ?? "no task"
        case .running, .holding:
            return format(viewModel.elapsedSec)
        }
    }

    private var helperLabel: String {
        switch viewModel.state {
        case .idle: return "tap to start"
        case .running: return "tracking..."
        case .holding: return "tap to resume · hold to end"
        }
    }

    private func format(_ sec: Int) -> String {
        let h = sec / 3600
        let m = (sec % 3600) / 60
        let s = sec % 60
        return String(format: "%02d:%02d:%02d", h, m, s)
    }
}

#Preview {
    TimerScreen(viewModel: TimerViewModel())
}
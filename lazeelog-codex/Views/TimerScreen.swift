//
//  TimerScreen.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import SwiftUI

struct TimerScreen: View {
    @StateObject var viewModel: TimerViewModel
    @State private var showOverview = false
    @State private var sheetY: CGFloat = 0
    @GestureState private var dragY: CGFloat = 0

    var body: some View {
        GeometryReader { geo in
            let closedY = geo.size.height - 110
            let openY = geo.size.height - 420
            let currentY = min(max(sheetY + dragY, openY), closedY)

            ZStack(alignment: .top) {
                Theme.Colors.bg.ignoresSafeArea()

                VStack(spacing: 24) {
                    header

                    TrackButton(
                        color: categoryColor,
                        label: centerLabel,
                        subLabel: helperLabel,
                        holdProgress: viewModel.holdProgress,
                        onTap: viewModel.onMainTap,
                        onHoldStart: viewModel.startHold,
                        onHoldEnd: viewModel.releaseHold
                    )

                    categoryRow
                    Spacer()
                }
                .padding(.top, 18)

                HistorySheet(sessions: viewModel.sessions)
                    .frame(height: 420)
                    .offset(y: currentY)
                    .animation(.spring(response: 0.35, dampingFraction: 0.85), value: sheetY)
                    .gesture(
                        DragGesture()
                            .updating($dragY) { value, state, _ in
                                state = value.translation.height
                            }
                            .onEnded { value in
                                let projected = sheetY + value.predictedEndTranslation.height
                                let mid = (openY + closedY) / 2
                                sheetY = projected < mid ? openY : closedY
                            }
                    )
                    .onAppear { sheetY = closedY }
            }
            .sheet(isPresented: $showOverview) {
                OverviewScreen(sessions: viewModel.sessions)
            }
        }
    }

    private var header: some View {
        HStack {
            Text("LazeeLog")
                .foregroundStyle(Theme.Colors.text)
                .font(.system(size: 22, weight: .bold))
            Spacer()
            Button(action: { showOverview = true }) {
                Image(systemName: "square.grid.3x3.fill")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(Theme.Colors.text)
                    .frame(width: 36, height: 36)
                    .background(Theme.Colors.surfaceHi)
                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
        }
        .padding(.horizontal, 20)
    }

    private var categoryRow: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(Category.seed) { cat in
                    Button(cat.name) { viewModel.selectedCategoryId = cat.id }
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
    }

    private var categoryColor: Color {
        viewModel.category(by: viewModel.selectedCategoryId)?.color ?? Theme.Colors.borderHi
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

struct OverviewScreen: View {
    let sessions: [Session]

    var body: some View {
        NavigationView {
            List {
                Section("Today") {
                    Text("Sessions: \(sessions.count)")
                    Text("Total: \(format(sessions.reduce(0) { $0 + $1.durationSec }))")
                }
            }
            .navigationTitle("Overview")
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

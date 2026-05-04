//
//  TimerViewModel.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//

import Foundation
import Combine

enum TrackState {
    case idle
    case running
    case holding
}

final class TimerViewModel: ObservableObject {
    @Published var state: TrackState = .idle
    @Published var elapsedSec: Int = 0
    @Published var selectedCategoryId: String = Category.seed.first?.id ?? "design"
    @Published var sessions: [Session] = []
    @Published var holdProgress: Double = 0

    private var startedAt: Date?
    private var holdStartedAt: Date?
    private var timer: AnyCancellable?
    private var holdTimer: Timer?

    init() {
        timer = Timer.publish(every: 1, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] now in
                self?.tick(now)
            }
    }

    func onMainTap() {
        switch state {
        case .idle:
            startSession()
        case .running:
            state = .holding
        case .holding:
            state = .running
            cancelHold()
        }
    }

    func startHold() {
        guard state == .holding else { return }
        if holdTimer != nil { return }
        holdStartedAt = Date()
        holdTimer = Timer.scheduledTimer(withTimeInterval: 1.0 / 60, repeats: true) { [weak self] timer in
            guard let self, let start = self.holdStartedAt else { return }
            let progress = min(Date().timeIntervalSince(start), 1.0)
            self.holdProgress = progress
            if progress >= 1.0 {
                timer.invalidate()
                self.endSession()
            }
        }
    }

    func cancelHold() {
        holdTimer?.invalidate()
        holdTimer = nil
        holdStartedAt = nil
        holdProgress = 0
    }

    func category(by id: String) -> Category? {
        Category.seed.first { $0.id == id }
    }

    private func startSession() {
        startedAt = Date()
        elapsedSec = 0
        state = .running
    }

    private func endSession() {
        guard let start = startedAt else { return }
        let ended = Date()
        let label = category(by: selectedCategoryId)?.name ?? "task"

        sessions.insert(
            Session(
                id: UUID(),
                categoryId: selectedCategoryId,
                label: label,
                startedAt: start,
                endedAt: ended
            ),
            at: 0
        )

        state = .idle
        elapsedSec = 0
        startedAt = nil
        cancelHold()
    }

    private func tick(_ now: Date) {
        guard state == .running, let start = startedAt else { return }
        elapsedSec = Int(now.timeIntervalSince(start))
    }
}

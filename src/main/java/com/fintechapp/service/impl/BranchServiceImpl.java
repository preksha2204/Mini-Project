package com.fintechapp.service.impl;

import com.fintechapp.entity.Branch;
import com.fintechapp.repository.BranchRepository;
import com.fintechapp.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Override
    public Branch createBranch(Branch branch) {
        branch.setCreatedAt(LocalDateTime.now());
        branch.setUpdatedAt(LocalDateTime.now());
        return branchRepository.save(branch);
    }

    @Override
    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    @Override
    public Optional<Branch> getBranchById(Long id) {
        return branchRepository.findById(id);
    }

    @Override
    public Optional<Branch> updateBranch(Long id, Branch updatedBranch) {
        return branchRepository.findById(id).map(branch -> {
            branch.setBranchCode(updatedBranch.getBranchCode());
            branch.setBranchName(updatedBranch.getBranchName());
            branch.setBranchAddress(updatedBranch.getBranchAddress());
            branch.setUpdatedAt(LocalDateTime.now());
            return branchRepository.save(branch);
        });
    }

    @Override
    public boolean deleteBranch(Long id) {
        if (branchRepository.existsById(id)) {
            branchRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

package com.fintechapp.service;

import com.fintechapp.entity.Branch;

import java.util.List;
import java.util.Optional;

public interface BranchService {
    Branch createBranch(Branch branch);
    List<Branch> getAllBranches();
    Optional<Branch> getBranchById(Long id);
    Optional<Branch> updateBranch(Long id, Branch updatedBranch);
    boolean deleteBranch(Long id);
}
